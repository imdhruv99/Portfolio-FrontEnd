'use client';

import { useEffect, useState } from 'react';
import Home from '@/components/Home';

export default function HomePage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <Home />;
}
