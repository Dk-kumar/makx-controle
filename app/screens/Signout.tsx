import { useEffect } from 'react';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';

const Signout = (): null => {
    const { switchRoute } = useSwitchRoute();
    useEffect(() => {
        switchRoute("Signin");
    }, [switchRoute]);
    return null;
};
export default Signout;