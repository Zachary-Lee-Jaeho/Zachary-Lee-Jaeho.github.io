% font variations: tiny, scriptsize, footnotesize, small, normalsize, large, Large, LARGE, huge, Huge
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{cv}[2026/04/14 Jaeho Lee CV class]

\LoadClass[11pt,letterpaper]{article}

% Packages
\RequirePackage[top=0.5in, bottom=0.5in, left=0.6in, right=0.6in]{geometry}
\RequirePackage{titlesec}
\RequirePackage{enumitem}
\RequirePackage[T1]{fontenc}
\RequirePackage[backend=bibtex,style=numeric,sorting=debug,maxnames=100]{biblatex}

% Entry type filters (bibtex backend doesn't support type= in \printbibliography)
\defbibcheck{isconf}{\ifentrytype{inproceedings}{}{\skipentry}}
\defbibcheck{isjour}{\ifentrytype{article}{}{\skipentry}}
\defbibcheck{ispost}{\ifentrytype{misc}{}{\skipentry}}

% Bibliography list environment: uses shorthand field as label [C1], [J1], [P1]
\setlength{\bibitemsep}{0pt}
\setlength{\bibparsep}{0pt}
\defbibenvironment{bibliography}
  {\list{}{%
    \setlength{\leftmargin}{2.8em}%
    \setlength{\labelwidth}{2.2em}%
    \setlength{\labelsep}{0.6em}%
    \setlength{\itemsep}{0pt}%
    \setlength{\parsep}{0pt}%
    \setlength{\topsep}{0pt}%
    \setlength{\partopsep}{0pt}%
    \emergencystretch=1em%
  }}
  {\endlist}
  {\item[\mkbibbrackets{\printfield{shorthand}}]}

% Author name format: "Given Family" order, highlight Jaeho Lee
\DeclareNameFormat{author}{%
  \ifthenelse{%
    \equal{\namepartfamily}{\cvauthorfamily}\AND\equal{\namepartgiven}{\cvauthorgiven}%
  }{%
    \textbf{\underline{\namepartgiven\addspace\namepartfamily}}%
  }{%
    \namepartgiven\addspace\namepartfamily%
  }%
  \ifthenelse{\value{listcount}<\value{liststop}}{%
    \ifthenelse{\value{listcount}=\numexpr\value{liststop}-1\relax}%
      {\addcomma\addspace and\addspace}%
      {\addcomma\addspace}%
  }{}%
}

% Custom driver: inproceedings
\DeclareBibliographyDriver{inproceedings}{%
  \printnames{author},\addspace
  \mkbibitalic{\printfield{title}},\addspace
  \mkbibbold{\printfield{booktitle}},\addspace
  \printfield{year}.%
  \finentry
}

% Custom driver: article
\DeclareBibliographyDriver{article}{%
  \printnames{author},\addspace
  \mkbibitalic{\printfield{title}},\addspace
  \mkbibbold{\printfield{journaltitle}},\addspace
  \printfield{year}.%
  \iffieldundef{note}{}{ (\printfield{note})}%
  \finentry
}

% Inline citation using shorthand field: \refcite{C2,C3,J3} → [C2, C3, J3]
\DeclareCiteCommand{\refcite}[\mkbibbrackets]
  {\usebibmacro{prenote}}
  {\printfield{shorthand}}
  {\multicitedelim}
  {\usebibmacro{postnote}}

% Custom driver: misc (posters)
\DeclareBibliographyDriver{misc}{%
  \printnames{author},\addspace
  \mkbibitalic{\printfield{title}},\addspace
  \printfield{howpublished},\addspace
  \printfield{year}.%
  \finentry
}

\RequirePackage[sfdefault]{carlito}
\RequirePackage{xcolor}
\RequirePackage{microtype}
\RequirePackage{hyperref}

% Line spacing
\linespread{1.1}

% Remove paragraph indent
\setlength{\parindent}{0pt}

% Colors
\definecolor{accent}{HTML}{2563EB}
\definecolor{darkgray}{HTML}{1e293b}
\definecolor{medgray}{HTML}{475569}
\definecolor{lightgray}{HTML}{94a3b8}

% Section formatting
\titleformat{\section}
  {\large\bfseries\color{darkgray}\uppercase}
  {}{0em}{}[\titlerule]
\titlespacing*{\section}{0pt}{0.7em}{0.35em}

% List formatting
\setlist[itemize]{leftmargin=1.2em, itemsep=0.05em, parsep=0pt, topsep=0.15em}
\setlist[enumerate]{leftmargin=2.8em, itemsep=0.35em, parsep=0pt, topsep=0.15em}

% No page number
\pagestyle{empty}

% Custom commands
\newcommand{\entrytitle}[1]{{\large\textbf{#1}}}
\newcommand{\entrymeta}[1]{\hfill{\small\color{medgray}#1}}
\newcommand{\entrydetail}[1]{{\small\color{medgray}#1}}
\newcommand{\authorhl}[1]{\textbf{\underline{#1}}}
\newcommand{\pubtitle}[1]{\textit{#1}}

% Title block command — uses macros from cv-meta.tex
\newcommand{\makecvtitle}{%
  \begin{center}
    {\cvnamesize\bfseries\cvname} \\[0.25em]
    {\small
      \cvinstitution
      \enspace$|$\enspace
      \texttt{\cvemail}
      \\
      \href{\cvlabfullurl}{\cvlaburl}
      \enspace$|$\enspace
      \href{\cvwebfullurl}{\cvweburl}
      \enspace$|$\enspace
      \href{\cvlinkedinfullurl}{\cvlinkedinurl}
    }
  \end{center}
}
