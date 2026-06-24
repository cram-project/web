export function DocumentIcon({ size = 40 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
            <rect x="8" y="4" width="24" height="32" rx="3" stroke="#2D5C4D" strokeWidth="1.5" fill="#FAF8F3" />
            <path d="M14 14h12M14 20h12M14 26h8" stroke="#C9A86C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 4v6h6" stroke="#2D5C4D" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}
