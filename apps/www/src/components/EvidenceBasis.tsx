import { formatEvidenceBasis, type ProofClaim } from "@/data/proofs";

type EvidenceBasisProps = {
  proof: Pick<ProofClaim, "evidenceClass">;
  inverse?: boolean;
};

export function EvidenceBasis({ proof, inverse = false }: EvidenceBasisProps) {
  return (
    <p className={`mt-3 text-xs leading-5 ${inverse ? "text-jb-paper/90" : "text-jb-ink/72"}`}>
      Evidence: {formatEvidenceBasis(proof)}
    </p>
  );
}
