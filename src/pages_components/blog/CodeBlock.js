import React, {useEffect, useMemo, useState, useCallback, useRef} from "react";
import Prism from "prismjs";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-python";
import "prismjs/components/prism-csharp";
import {RiFileCopyFill} from "react-icons/ri";

/* =========================
   Hash helpers
========================= */

function parseScopedHash(hash) {
    if (!hash) return null;

    const match = hash.match(/^#([^:]+):L(\d+)(?:-L(\d+))?$/i);
    if (!match) return null;

    return {
        blockId: match[1],
        start: Number(match[2]),
        end: match[3] ? Number(match[3]) : Number(match[2]),
    };
}

function buildScopedHash(blockId, start, end) {
    if (start === end) return `#${blockId}:L${start}`;
    return `#${blockId}:L${start}-L${end}`;
}

/* =========================
   Annotation helpers
========================= */

function normalizeLineRange(line) {
    if (Array.isArray(line)) {
        return {
            start: Math.min(line[0], line[1]),
            end: Math.max(line[0], line[1]),
        };
    }
    return {start: line, end: line};
}

function buildAnnotationMap(annotations = []) {
    const map = {};

    annotations.forEach((ann) => {
        const {start, end} = normalizeLineRange(ann.line);

        for (let i = start; i <= end; i++) {
            if (!map[i]) map[i] = [];
            map[i].push(ann);
        }
    });

    return map;
}

/* =========================
   Component
========================= */

export default function CodeBlock({
                                      script = "",
                                      language = "plain",
                                      showLineNumbers = false,
                                      blockId,
                                      annotations = [],
                                  }) {
    const [copied, setCopied] = useState(false);
    const [selectedLines, setSelectedLines] = useState([]);
    const [activeRange, setActiveRange] = useState(null);
    const [openAnnotations, setOpenAnnotations] = useState(new Set());

    const rootRef = useRef(null);

    const prismLanguage = Prism.languages[language] ? language : "plain";

    const highlightedHtml = useMemo(() => {
        return Prism.highlight(
            script,
            Prism.languages[prismLanguage],
            prismLanguage
        );
    }, [script, prismLanguage]);

    const rawLines = useMemo(() => script.split("\n"), [script]);

    const highlightedLines = useMemo(() => {
        const split = highlightedHtml.split("\n");

        return split.filter((lineHtml, index) => {
            const isLastEmptyLine =
                index === split.length - 1 &&
                lineHtml === "" &&
                rawLines.length > 1;

            return !isLastEmptyLine;
        });
    }, [highlightedHtml, rawLines.length]);

    const annotationMap = useMemo(
        () => buildAnnotationMap(annotations),
        [annotations]
    );

    const totalLines = highlightedLines.length;

    const normalizeRange = useCallback((start, end) => {
        const safeStart = Math.max(1, Math.min(start, totalLines));
        const safeEnd = Math.max(1, Math.min(end, totalLines));

        return {
            start: Math.min(safeStart, safeEnd),
            end: Math.max(safeStart, safeEnd),
        };
    }, [totalLines]);

    const getLineRange = useCallback((start, end) => {
        const range = normalizeRange(start, end);
        const arr = [];
        for (let i = range.start; i <= range.end; i++) arr.push(i);
        return arr;
    }, [normalizeRange]);

    /* =========================
       HASH SYNC
    ========================= */

    const applyHash = useCallback(() => {
        const parsed = parseScopedHash(window.location.hash);
        if (!parsed || parsed.blockId !== blockId) return;

        const range = normalizeRange(parsed.start, parsed.end);

        setActiveRange(range);
        setSelectedLines(getLineRange(range.start, range.end));

        rootRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [blockId, getLineRange, normalizeRange]);

    useEffect(() => {
        applyHash();
        window.addEventListener("hashchange", applyHash);
        return () => window.removeEventListener("hashchange", applyHash);
    }, [applyHash]);

    const updateHash = (start, end) => {
        const hash = buildScopedHash(blockId, start, end);
        window.history.replaceState(null, "", hash);
    };

    /* =========================
       INTERACTION
    ========================= */

    const handleLineClick = (lineNumber, e) => {
        if (!showLineNumbers) return;

        if (e.shiftKey && activeRange) {
            const range = normalizeRange(activeRange.start, lineNumber);
            setActiveRange(range);
            setSelectedLines(getLineRange(range.start, range.end));
            updateHash(range.start, range.end);
            return;
        }

        const range = {start: lineNumber, end: lineNumber};
        setActiveRange(range);
        setSelectedLines([lineNumber]);
        updateHash(lineNumber, lineNumber);
    };

    /* =========================
       COPY
    ========================= */

    const copyWithFeedback = async (text) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    const handleCopyAll = () => copyWithFeedback(script);

    const handleCopySelection = () => {
        if (!selectedLines.length) return;

        const text = selectedLines
            .map((l) => rawLines[l - 1] ?? "")
            .join("\n");

        copyWithFeedback(text);
    };

    const handleCopyLine = (lineNumber, e) => {
        e.stopPropagation(); // 🔥 don't trigger selection
        copyWithFeedback(rawLines[lineNumber - 1] ?? "");
    };

    /* =========================
       ANNOTATIONS
    ========================= */

    const toggleAnnotation = (lineNumber, e) => {
        e.stopPropagation();

        setOpenAnnotations((prev) => {
            const next = new Set(prev);
            if (next.has(lineNumber)) next.delete(lineNumber);
            else next.add(lineNumber);
            return next;
        });
    };

    const rangeLabel =
        selectedLines.length > 1
            ? `L${selectedLines[0]}–L${selectedLines[selectedLines.length - 1]}`
            : selectedLines.length === 1
                ? `L${selectedLines[0]}`
                : null;

    /* =========================
       RENDER
    ========================= */

    return (
        <div
            ref={rootRef}
            className="gatsby-highlight"
            data-language={language}
            data-block-id={blockId}
        >
            <div className="code-header">
                <span className="code-lang">{language}</span>

                <div className="code-actions">
                    {rangeLabel && <span className="code-range">{rangeLabel}</span>}

                    {selectedLines.length > 0 && (
                        <button className="copy-btn" onClick={handleCopySelection}>
                            Copy {selectedLines.length}
                        </button>
                    )}

                    <button
                        className={`copy-btn ${copied ? "copied" : ""}`}
                        onClick={handleCopyAll}
                    >
                        {copied ? "✓ Copied" : "Copy"}
                    </button>
                </div>
            </div>

            <pre className={`language-${prismLanguage}`}>
        <code className={`language-${prismLanguage}`}>
          {highlightedLines.map((lineHtml, index) => {
              const lineNumber = index + 1;
              const selected = selectedLines.includes(lineNumber);
              const anns = annotationMap[lineNumber] || [];
              const isAnnotated = anns.length > 0;
              const isOpen = openAnnotations.has(lineNumber);

              return (
                  <React.Fragment key={lineNumber}>
                      <div
                          id={`${blockId}-L${lineNumber}`}
                          className={`code-line ${
                              selected ? "selected" : ""
                          } ${isAnnotated ? "annotated" : ""}`}
                      >
                          {showLineNumbers && (
                              <button
                                  className="line-number"
                                  onClick={(e) => handleLineClick(lineNumber, e)}
                              >
                                  {lineNumber}
                              </button>
                          )}

                          <span
                              className="line-content"
                              dangerouslySetInnerHTML={{
                                  __html: lineHtml || "&nbsp;",
                              }}
                          />

                          {/* 🔥 RIGHT-SIDE ACTIONS */}
                          <div className="line-actions">
                              <button
                                  className="line-copy"
                                  onClick={(e) => handleCopyLine(lineNumber, e)}
                                  title="Copy line"
                              >
                                  <RiFileCopyFill/>

                              </button>

                              {isAnnotated && (
                                  <button
                                      className="annotation-marker"
                                      onClick={(e) => toggleAnnotation(lineNumber, e)}
                                      title="Show annotation"
                                  >
                                      ●
                                  </button>
                              )}
                          </div>
                      </div>

                      {isAnnotated && isOpen && (
                          <div className="code-annotation">
                              {anns.map((ann, i) => (
                                  <div key={i} className="annotation">
                                      {ann.title && (
                                          <div className="annotation-title">
                                              {ann.title}
                                          </div>
                                      )}
                                      <div>{ann.content}</div>
                                  </div>
                              ))}
                          </div>
                      )}
                  </React.Fragment>
              );
          })}
        </code>
      </pre>
        </div>
    );
}