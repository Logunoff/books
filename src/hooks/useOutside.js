import { useEffect, useRef, useState } from 'react';

export function useOutside(initialVisible) {
    const [isShow, setIsShow] = useState(initialVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShow(initialVisible);
        }
    }

    useEffect(() => {
        if (isShow) { document.addEventListener('click', handleClickOutside) }
        else { document.removeEventListener('click', handleClickOutside) }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })

    return { ref, isShow, setIsShow };
}