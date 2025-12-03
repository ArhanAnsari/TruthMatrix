"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface RichContentRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

export default function RichContentRenderer({
  content,
  className = "",
  inline = false,
}: RichContentRendererProps) {
  // Sanitize and prepare content
  const processedContent = useMemo(() => {
    return content
      .trim()
      .replace(/\$\$/g, "\n$$\n") // Ensure block math on new lines
      .replace(/(?<!\$)\$(?!\$)([^$]+)\$(?!\$)/g, " $$$1$ "); // Inline math
  }, [content]);

  const markdownComponents = {
    // Code blocks with syntax highlighting
    code: ({ inline: isInline, className, children }: any) => {
      const language = className?.replace("language-", "") || "";
      return isInline ? (
        <code className="bg-slate-700/50 px-2 py-1 rounded text-amber-300 font-mono text-sm">
          {children}
        </code>
      ) : (
        <pre className="bg-slate-900 border border-slate-600 rounded-lg p-4 overflow-x-auto my-4">
          <code className={`language-${language} text-slate-200 font-mono text-sm`}>
            {children}
          </code>
        </pre>
      );
    },

    // Emphasis
    em: ({ children }: any) => (
      <em className="italic text-blue-300">{children}</em>
    ),

    // Strong
    strong: ({ children }: any) => (
      <strong className="font-bold text-emerald-300">{children}</strong>
    ),

    // Headings
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold text-blue-300 mt-6 mb-3 border-b border-slate-600 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold text-purple-300 mt-5 mb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-bold text-pink-300 mt-4 mb-2">
        {children}
      </h3>
    ),

    // Lists
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 ml-2 text-slate-300">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 ml-2 text-slate-300">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-slate-300 ml-2">{children}</li>
    ),

    // Links
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline hover:no-underline transition"
      >
        {children}
      </a>
    ),

    // Blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 text-slate-400 italic bg-slate-700/30 rounded-r-lg">
        {children}
      </blockquote>
    ),

    // Paragraphs
    p: ({ children }: any) => (
      <p className="text-slate-300 mb-3 leading-relaxed">{children}</p>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-6 border-t border-slate-600" />
    ),

    // Table
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-slate-600">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-slate-700/50">{children}</thead>
    ),
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    tr: ({ children }: any) => (
      <tr className="border border-slate-600">{children}</tr>
    ),
    th: ({ children }: any) => (
      <th className="border border-slate-600 px-4 py-2 text-left text-slate-200 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-slate-600 px-4 py-2 text-slate-300">
        {children}
      </td>
    ),
  };

  return (
    <div
      className={`rich-content ${className}`}
      style={{
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={markdownComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

// Utility function for inline LaTeX rendering
export function RenderLatex({ latex }: { latex: string }) {
  return (
    <span
      className="inline-math"
      style={{
        display: "inline",
        fontFamily: "serif",
        fontSize: "1.1em",
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {`$${latex}$`}
      </ReactMarkdown>
    </span>
  );
}
