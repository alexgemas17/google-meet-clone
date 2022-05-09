import React from 'react'
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
    url: string
}

export const Redirect = ({ url }: RedirectProps) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate(url);
    }, [])

    return (
        <></>
    )
}
