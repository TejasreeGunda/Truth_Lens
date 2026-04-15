

# Plan: Generate Source Code PDF

Generate a single, readable PDF containing all TruthLens source code files, optimized for visibility and easy copying.

## Approach

Use Python's `reportlab` library to create a clean, well-formatted PDF with:

- **Monospace font** (Courier) for code readability and copy-friendliness
- **Clear file headers** with the file path prominently displayed
- **Page breaks** between files to keep things organized
- **Table of contents** on the first page listing all included files
- **Light background**, dark text for maximum readability
- **Small but legible font size** (8-9pt) to fit code lines without wrapping

## Files to Include (17 source files)

**Config**: `tailwind.config.ts`, `vite.config.ts`, `index.html`
**Core**: `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, `src/lib/utils.ts`
**Components**: `AppLayout.tsx`, `GlassCard.tsx`, `StatCard.tsx`, `AnimatedCounter.tsx`, `ConfidenceMeter.tsx`, `NavLink.tsx`
**Pages**: `Dashboard.tsx`, `Analyzer.tsx`, `Analytics.tsx`, `ChartsPage.tsx`, `LearningHub.tsx`, `HistoryPage.tsx`, `AlertsPage.tsx`, `NotFound.tsx`

## Output

A single PDF at `/mnt/documents/TruthLens_SourceCode.pdf`

## Technical Details

- Use `reportlab.platypus` with `SimpleDocTemplate` for automatic pagination
- Courier font at 8pt for code, Helvetica for headers
- Line numbers included for reference
- Each file starts on a new page with a styled header bar
- QA: convert pages to images and inspect for layout issues

