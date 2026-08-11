# Alveto visual-agent orchestration

## Native setup

The six roles are native repository-scoped Codex Skills in `.agents/skills`. The root `AGENTS.md` supplies shared rules; each skill contains only its role-specific process. The detailed design specification lives in `docs/codex/alveto-design-recovery.md` so the roles do not drift through duplicated guidance.

## Invocation matrix

| Role | Explicit invocation | Launch point | Edit authority |
| --- | --- | --- | --- |
| Creative Director | `$alveto-creative-director` | Before direction selection and at final visual review | Read-only by default |
| Motion Director | `$alveto-motion-director` | After static direction approval, before motion code | Read-only map/review |
| Experimental Frontend | `$alveto-experimental-frontend` | Only for a bounded approved technique | Recommendation/prototype only |
| Image Art Director | `$alveto-image-art-director` | During discovery and after real crops render | Read-only |
| Visual QA | `$alveto-visual-qa` | Baseline, candidate review, and final gate | Read-only |
| Performance Guardian | `$alveto-performance-guardian` | Baseline, technique review, and final gate | Read-only |

Example: `Use $alveto-creative-director to compare this homepage proposal with current production at every mobile width and issue a pass/fail verdict.`

## Recommended task/worktree model

1. Keep the producer task on a clean production-main-derived branch.
2. Launch Creative Director, Image Art Director, and Visual QA as independent read-only tasks/subagents in parallel.
3. Launch Motion Director, Experimental Frontend, and Performance Guardian independently after the evidence set is fixed. Do not include other roles' conclusions in their initial prompts.
4. The producer synthesizes disagreements using the priority order in `AGENTS.md`; it does not average them.
5. After user approval, create one isolated implementation worktree. Assign one implementation owner for the homepage source set.
6. If an experimental technique needs proof, place it in a separate disposable worktree and compare screenshots/performance before porting any code.
7. Review roles operate against the candidate commit read-only. They do not patch the implementation during review.
8. Present a preview only after every gate passes.

Codex desktop can run independent tasks in separate worktrees. When project-scoped skills do not appear immediately after creation, restart Codex or open a new task so discovery refreshes.

## Ownership boundaries

| Workstream | May own edits | Must remain read-only |
| --- | --- | --- |
| Static homepage composition | One designated implementation task | All six review roles |
| Motion primitive and approved usage | Same implementation task or one isolated motion worktree | Creative, Image, QA, Performance |
| Image assets/crops | No asset edit without separate owner approval | Image Art Director defines rules only |
| `/menu`, data, SEO, API, revalidation, Supabase | Out of visual recovery scope | Every visual role |
| Test screenshots/reports | Visual QA task | Implementation task does not self-approve |

No two agents edit the same file set concurrently. If ownership must change, stop the previous editor, record its working-tree state, and hand off explicitly.

## Evidence package for every review

- Clean production-main reference and commit hash.
- Candidate commit or worktree.
- Live or local screenshots at 320, 375, 390/393, 430, 768, 1024, and 1440px.
- 320×568 short-height mobile-menu capture and one iPhone safe-area capture.
- Populated and empty CMS states where safe to reproduce.
- Reduced-motion capture.
- Keyboard/focus notes and console/hydration output.
- Same-run performance comparison using identical environment and CMS snapshot.

## Required role report shape

Each role returns:

- verdict: pass, conditional pass, or reject;
- evidence, not taste-only assertions;
- severity and affected viewport/state;
- likely cause;
- concrete acceptance criterion;
- residual uncertainty;
- confirmation that it made no out-of-scope edits.

Visual QA additionally supplies screenshots. Performance Guardian supplies measurement method and deltas. Experimental Frontend supplies fallback and reduced-motion behavior for every technique.

## Conflict resolution

Apply these priorities without averaging:

1. Explicit user decision and scope.
2. Recognizable production Alveto identity.
3. Mobile visual quality.
4. Premium hospitality perception.
5. Usability and WCAG 2.2 AA.
6. Performance and architecture.
7. Experimental novelty.

A visually attractive effect is removed when it harms mobile usability or the performance budget. A technically cheap effect is removed when it looks generic or weakens Alveto. Engineering success cannot overrule Creative Director or Visual QA rejection.
