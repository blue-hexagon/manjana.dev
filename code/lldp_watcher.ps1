<#
This script is aimed at Cisco Catalyst 9K switches and their corresponding TLVs, you may want to adjust the TLVs.
#>
function Watch-LLDP {
    param(
        [string]$Interface = "Ethernet 2"
    )

    $fmt = "{0,-10} {1,-28} {2,-12} {3,-15} {4,-5} {5,-12} {6,-25} {7,-1} {8,-6}"

    Write-Host "Starting LLDP Sniffer on $Interface`n" -ForegroundColor Cyan

    function Resolve-Tshark {
        $cmd = Get-Command tshark -ErrorAction SilentlyContinue
        if ($cmd) { return $cmd.Source }

        $paths = @(
            "$Env:ProgramFiles\Wireshark\tshark.exe",
            "${Env:ProgramFiles(x86)}\Wireshark\tshark.exe"
        )

        foreach ($p in $paths) {
            if (Test-Path $p) { return $p }
        }

        throw "tshark.exe not found"
    }

    function Format-LLDP {
        param($line)

        if (-not $line) { return }

        $p = ($line -split '\|', 10) | ForEach-Object { $_.Trim() }
        if (-not $p[1] -and -not $p[3]) {
            return
        }
        if ($p[9] -eq "True") { return }
        while ($p.Count -lt 10) { $p += "" }


        $rawTime = $p[0]
        try {
            $dt = [datetime]::Parse($rawTime)
            $time = $dt.ToString("HH:mm:ss")
        }
        catch {
            $time = $rawTime
        }

        $name = if ($p[1]) {
            ($p[1] -replace '\.unicph.*$', '')
        }
        else {
            "-"
        }
        $port = if ($p[2]) { $p[2] } else { "-" }
        $ip = if ($p[3]) { $p[3] } else { "-" }
        $gig = if ($p[4]) { $p[4] } else { "-" }
        $sw = if ($p[5]) { $p[5] } else { "-" }
        $vendor = if ($p[6]) { $p[6] } else { "-" }
        $model = if ($p[7]) { $p[7] } else { "-" }
        $vlan = if ($p[8]) { $p[8] } else { "-" }

        $fmt -f $time, $name, $port, $ip, $gig, $sw, $vendor, $model, $vlan
    }

    try {
        $tshark = Resolve-Tshark
        $sep = '|~|'

        $args = @(
            '-i', $Interface
            '-l'
            '-Y', 'lldp'
            '-T', 'fields'
            '-E', "separator=$sep"
            '-E', 'occurrence=f'
            '-e', 'frame.time'
            '-e', 'lldp.tlv.system.name'
            '-e', 'lldp.port.id'
            '-e', 'lldp.mgn.addr.ip4'
            '-e', 'lldp.ieee.802_3.pmd_auto_neg_advertised_caps.1000base_tfd'
            '-e', 'lldp.media.software'
            '-e', 'lldp.media.manufacturer'
            '-e', 'lldp.media.model'
            '-e', 'lldp.ieee.802_1.port_vlan.id'
            '-e', 'lldp.tlv.system_cap.station_only'
        )

        # Header
        $fmt -f "Time", "System Name", "Port", "Gateway", "1G", "Software", "Vendor", "Model", "VLAN" |
        Write-Host -ForegroundColor Yellow

        "-" * 130 | Write-Host

        # Stream + format
        & $tshark @args 2>$null | ForEach-Object {
            $formatted = Format-LLDP $_
            if ($formatted) {
                Write-Host $formatted
            }
        }
    }
    catch {
        $_.Exception.Message | Write-Host -ForegroundColor Red
    }
}

# Just change the interface according to the one you use (tshark.exe -D)
Watch-LLDP -Interface "Ethernet 2"