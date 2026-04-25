import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { sql } from "@codemirror/lang-sql";
import { rust } from "@codemirror/lang-rust";
import { php } from "@codemirror/lang-php";
import { markdown } from "@codemirror/lang-markdown";

export const languages = {
  javascript: javascript(),
  python: python(),
  java: java(),
  cpp: cpp(),
  css: css(),
  html: html(),
  json: json(),
  sql: sql(),
  rust: rust(),
  php: php(),
  markdown: markdown(),
};
