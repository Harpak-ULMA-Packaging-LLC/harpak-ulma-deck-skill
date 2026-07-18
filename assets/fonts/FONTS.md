# Harpak-ULMA deck fonts: install kit

The deck template uses the three brand typefaces from Brand Book v0.3.
All are free and open source (SIL Open Font License). Install them once
and every deck renders as designed; without them PowerPoint substitutes
and spacing drifts.

## What to install

The .ttf files in this folder, or download the families yourself:

| Role | Family | Get it |
|---|---|---|
| Display and headings | Archivo | https://fonts.google.com/specimen/Archivo (Download family) |
| Body and UI | Inter | https://fonts.google.com/specimen/Inter |
| Figures, specs, captions | JetBrains Mono | https://fonts.google.com/specimen/JetBrains+Mono |

Weights the template uses: Archivo Regular, Medium, SemiBold, Bold,
ExtraBold; Inter Regular, Medium, SemiBold, Bold; JetBrains Mono Regular,
Medium, Bold. The Google Fonts "Download family" zip contains static
weights; install at least the ones above. Non-standard weights appear in
PowerPoint as their own families ("Archivo ExtraBold", "Inter SemiBold",
"JetBrains Mono Medium"); the template references those names, so install
the individual weight files rather than relying on a variable font.

## Install

- Windows: select all .ttf files, right-click, "Install for all users".
  Restart PowerPoint.
- macOS: select all .ttf files, open, "Install Font" in Font Book.
  Restart PowerPoint.

## If a recipient does not have the fonts

Decks still open; PowerPoint substitutes fonts and layouts shift slightly.
For view-only sharing, export to PDF instead. Font embedding in PowerPoint
(File > Options > Save > Embed fonts) works on Windows but inflates the
file and is inconsistent on macOS; the install is the reliable path.
