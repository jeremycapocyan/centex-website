# Team profiles

Edit `src/lib/team.ts` to add or update an approved employee profile. Each entry needs a unique slug, name, position, category, initials, introduction, and biography paragraphs. Add an optimized, authorized headshot under `public/images/` and set the entry's `image` path when available. Omit `image` to show a clearly labeled initials placeholder; do not substitute a generated person.

The category order and labels live in `teamCategories`: Agents & Producers (`agents-producers`), Policy Support Team (`policy-support`), and Client Experience & Retention (`client-experience-retention`). Keep the employee's official title separate from their category. Both the homepage and team directory group profiles by these categories.

Profiles automatically appear in the homepage team section, `/team/`, individual `/team/[slug]/` bio pages, and the sitemap. Use verified facts and approved biographies only. Full bios and headshots for Giro Sollano, Aaron Paul Manabat, and Jeremy Angelo Alonzo are currently pending.

Reginald Ray's approved biography and user-supplied headshot were added on October 24, 2026. The original `image (4).png` was resized proportionally and encoded as `public/images/reginald-ray.webp` (896 × 1120), without retouching his appearance. His formal title remains Personal Lines Producer; his introduction uses his preferred nickname, Reggie. Set optional `imageDimensions` to a portrait's actual pixel dimensions when they differ from the existing 435 × 636 default.

The commercial auto/vehicle offering retains the existing `commercial-truck` URL and form identifier so saved links continue working; its displayed name and coverage copy have been updated.
