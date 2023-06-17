export function resize(size: string): boolean {
    switch (size) {
        case 'xs':
            return (window.innerWidth < 576);

        case 'sm':
            return (window.innerWidth >= 576 && window.innerWidth < 768);

        case 'md':
            return (window.innerWidth >= 768 && window.innerWidth < 992);

        case 'lg':
            return (window.innerWidth >= 992 && window.innerWidth < 1200);

        case 'xl':
            return (window.innerWidth >= 1200);

        default: return false
    }
}

export function checkHeight(): boolean{
    return (window.innerHeight <= 825)
}