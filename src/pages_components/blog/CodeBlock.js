import React, { useState } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-powershell"
export default function CodeBlock({ script, language = "powershell" }) {
    const [copied, setCopied] = useState(false)

    const html = Prism.highlight(
        script,
        Prism.languages[language],
        language
    )

    const lines = html.split("\n")

    const handleCopy = async () => {
        await navigator.clipboard.writeText(script)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    return (
        <div className="gatsby-highlight" data-language={language}>
    <div className="code-header">
        <span className="code-lang">{language}</span>

        <button className="copy-btn" onClick={handleCopy}>
            {copied ? "✓ Copied" : "Copy"}
        </button>
    </div>
            <pre className={`language-${language}`}>
                <code className={`language-${language}`}>
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className="code-line"
                            dangerouslySetInnerHTML={{
                                __html: line || " ",
                            }}
                        />
                    ))}
                </code>
            </pre>
        </div>
    )
}