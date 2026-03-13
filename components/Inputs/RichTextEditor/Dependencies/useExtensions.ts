import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Text } from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import { Italic } from "@tiptap/extension-italic";
import type { EditorOptions } from "@tiptap/core";
import { Strike } from "@tiptap/extension-strike";
import { Document } from "@tiptap/extension-document";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Underline } from "@tiptap/extension-underline";
import { HardBreak } from "@tiptap/extension-hard-break";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { TableCell } from "@tiptap/extension-table-cell";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { FontFamily } from "@tiptap/extension-font-family";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Superscript } from "@tiptap/extension-superscript";
import { TableHeader } from "@tiptap/extension-table-header";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";


import { FontSize, HeadingWithAnchor, LinkBubbleMenuHandler, ResizableImage, TableImproved } from "mui-tiptap";

export type UseExtensionsOptions = { placeholder?: string; };

const CustomLinkExtension = Link.extend({ inclusive: false });
const CustomSubscript = Subscript.extend({ excludes: "superscript" });
const CustomSuperscript = Superscript.extend({ excludes: "subscript" });

export default function useExtensions( { placeholder }: UseExtensionsOptions = {} ): EditorOptions["extensions"] {

	return useMemo(() => {

		return [
			StarterKit,
			/**
			 * TABLES
			 */
			TableImproved.configure({ resizable: true }), TableRow, TableHeader, TableCell,
			/**
			 * BASIC TEXT
			 */
			Document, Paragraph, Text,
			/**
			 * MARKS
			 */
			Italic, Strike, Underline, TextStyle, Color,
			Highlight.configure({ multicolor: true }), FontFamily, FontSize,
			/**
			 * LINKS
			 */
			CustomLinkExtension.configure({ autolink: true, linkOnPaste: true, openOnClick: false }), LinkBubbleMenuHandler,
			/**
			 * HEADINGS
			 */
			HeadingWithAnchor,
			/**
			 * ALIGNMENT
			 */
			TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
			/**
			 * CURSORS
			 */
			Gapcursor, Dropcursor,
			/**
			 * IMAGES
			 */
			ResizableImage,
			/**
			 * TASK LISTS
			 */
			TaskList, TaskItem.configure({ nested: true }),
			/**
			 * SCRIPT
			 */
			CustomSubscript, CustomSuperscript,
			/**
			 * BREAKS
			 */
			HardBreak, HorizontalRule,
			/**
			 * PLACEHOLDER
			 */
			Placeholder.configure({ placeholder }),
		];
	}, [placeholder]);
}