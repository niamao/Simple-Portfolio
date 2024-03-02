"use client";

import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "next-themes";

export function ThemeContext({ children }) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {	
		setLoaded(true);
	}, [setLoaded]);

	return loaded ? <ThemeProvider attribute="class">{children}</ThemeProvider> : null;
}
