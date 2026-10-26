# Team profiles

Edit `src/lib/team.ts` to add or update an approved employee profile. Each entry needs a unique slug, name, position, category, initials, introduction, and biography paragraphs. Add an optimized, authorized headshot under `public/images/` and set the entry's `image` path when available. Omit `image` to show a clearly labeled initials placeholder; do not substitute a generated person.

The category order and labels live in `teamCategories`: Agents & Producers (`agents-producers`), Policy Support Team (`policy-support`), and Client Experience & Retention (`client-experience-retention`). Keep the employee's official title separate from their category. Both the homepage and team directory group profiles by these categories.

Profiles automatically appear in the homepage team section, `/team/`, individual `/team/[slug]/` bio pages, and the sitemap. Use verified facts and approved biographies only. All five team members now have user-supplied headshots and published biographies.

Aaron Paul Manabat's approved three-paragraph biography was added on October 27, 2026. The repeated "has and has" was corrected to "has"; the rest of the supplied wording was preserved. His title, introduction, headshot, category, and profile URL remain unchanged.

Reginald Ray's approved biography and user-supplied headshot were added on October 24, 2026. The original `image (4).png` was resized proportionally and encoded as `public/images/reginald-ray.webp` (896 × 1120), without retouching his appearance. His formal title remains Personal Lines Producer; his introduction uses his preferred nickname, Reggie. Set optional `imageDimensions` to a portrait's actual pixel dimensions when they differ from the existing 435 × 636 default.

Giro Sollano's and Jeremy Angelo Alonzo's approved biographies and all three remaining headshots were added on October 24, 2026. Only the opening typo "iro" was corrected to "Giro" in Giro's supplied biography. Jeremy's supplied professional tagline is his introduction. Formal names, roles, categories, and profile URLs remain unchanged.

The following user-supplied PNGs were proportionally resized where needed and encoded as WebP without retouching appearances:

| Team member | Supplied file | Local asset | Dimensions |
| --- | --- | --- | --- |
| Giro Sollano | `Professional Blue Polo Headshot (1).png` | `public/images/giro-sollano.webp` | 896 × 1120 |
| Aaron Paul Manabat | `Smiling Corporate Insurance Professional.png` | `public/images/aaron-paul-manabat.webp` | 896 × 1344 |
| Jeremy Angelo Alonzo | `download.png` | `public/images/jeremy-angelo-alonzo.webp` | 887 × 887 |

The commercial auto/vehicle offering retains the existing `commercial-truck` URL and form identifier so saved links continue working; its displayed name and coverage copy have been updated.
