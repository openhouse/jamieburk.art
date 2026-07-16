# Atlas canonical records

`canonical.json` is the authoritative atomic record store for Atlas. It
contains every lifecycle record migrated from the E baseline and every public
proof claim formerly authored in `apps/www/src/data/proofs.ts`.

The former TypeScript banks are frozen reference inputs. `atlas:verify-legacy`
proves that their complete baseline records remain present and unchanged while
allowing Atlas to acquire future records. Consumers import
`@jamie-burkart/atlas/records`; they do not import the deprecated bank.

Branch-specific A-N variants remain full-fidelity source knowledge rather than
being silently coerced into canonical equivalence. Use `atlas:knowledge` to
query their normalized public-safe fields and `atlas:artifact` for explicitly
requested internal full-fidelity retrieval from immutable Git objects.

After editing canonical records, regenerate projections and run the complete
Atlas and repository eval suites. Never place raw private archives, credentials,
participant rows, or protected locators in this store.
