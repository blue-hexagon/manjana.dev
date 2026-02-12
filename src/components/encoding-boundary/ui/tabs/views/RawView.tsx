import * as React from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Typography,
} from "@mui/material"
import {formatBytes, FByteView} from "../../../utils/formatter"
import {DecodeSelector} from "../../../encodings/DecodeSelector"

/**
 * Valid TextDecoder encodings in browsers
 */
type DecodeEncoding =
    | "utf-8"
    | "windows-1252"
    | "iso-8859-1"
    | "utf-16le"

export function RawView({
                            bytes,
                            srcEncoding,
                        }: {
    bytes: Uint8Array
    srcEncoding: string
}) {
    const [byteView, setByteView] = React.useState<FByteView>("hex")
    const [decodeAs, setDecodeAs] = React.useState<DecodeEncoding>("utf-8")

    const formattedBytes = React.useMemo(
        () => formatBytes(bytes, byteView),
        [bytes, byteView]
    )

    const decodedText = React.useMemo(() => {
        try {
            return new TextDecoder(decodeAs, {fatal: false}).decode(bytes)
        } catch {
            return "� decoding failed"
        }
    }, [bytes, decodeAs])

    return (
        <Box>
            {/* Controls */}
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1, gap: 1}}>
                <Box>
                    <Typography sx={{fontSize: ".6rem", opacity: 0.6, mb: 0.25}}>
                        BYTES
                    </Typography>
                    <ButtonGroup size="small">
                        {(["hex", "hex0x", "binary", "decimal"] as FByteView[]).map(v => (
                            <Button
                                key={v}
                                variant={byteView === v ? "contained" : "outlined"}
                                onClick={() => setByteView(v)}
                            >
                                {v === "hex0x" ? "0x" : v}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>

                <Divider orientation="vertical" flexItem sx={{mx: 1, opacity: 0.3}}/>

                <Box>
                    <Typography sx={{fontSize: ".6rem", opacity: 0.6, mb: 0.25}}>
                        DECODE AS
                    </Typography>
                    <DecodeSelector
                        value={decodeAs}
                        onChange={setDecodeAs}
                    />
                    {/*<ButtonGroup size="small">*/}
                    {/*    {(*/}
                    {/*        [*/}
                    {/*            "utf-8",*/}
                    {/*            "windows-1252",*/}
                    {/*            "iso-8859-1",*/}
                    {/*            "utf-16le",*/}
                    {/*            "GB2312"*/}
                    {/*        ] as DecodeEncoding[]*/}
                    {/*    ).map(enc => (*/}
                    {/*        <Button*/}
                    {/*            key={enc}*/}
                    {/*            variant={decodeAs === enc ? "contained" : "outlined"}*/}
                    {/*            onClick={() => setDecodeAs(enc)}*/}
                    {/*        >*/}
                    {/*            {enc}*/}
                    {/*        </Button>*/}
                    {/*    ))}*/}
                    {/*</ButtonGroup>*/}
                </Box>
            </Box>

            {/* State line */}
            <Typography
                sx={{
                    fontSize: ".65rem",
                    opacity: 0.65,
                    mb: 0.5,
                    fontFamily: "monospace",
                }}
            >
                Bytes: {byteView.toUpperCase()} · Decoding:{" "}
                {srcEncoding.toUpperCase()} → {decodeAs.toUpperCase()}
            </Typography>

            {/* Decoded preview */}
            <Box
                component="pre"
                sx={{
                    m: 0,
                    p: 1,
                    borderRadius: 1,
                    background: "rgba(255,255,255,0.04)",
                    overflowX: "auto",
                    fontSize: ".78rem",
                    whiteSpace: "pre-wrap",
                    opacity: 0.9,
                }}
            >
                {decodedText}
            </Box>

            {/* Bytes */}
            <Box
                component="pre"
                sx={{
                    mt: 1,
                    m: 0,
                    p: 1,
                    borderRadius: 1,
                    background: "rgba(255,255,255,0.04)",
                    overflowX: "auto",
                    fontSize: ".78rem",
                    whiteSpace: "pre-wrap",
                    opacity: 0.9,
                }}
            >
                {formattedBytes}
            </Box>
        </Box>
    )
}
