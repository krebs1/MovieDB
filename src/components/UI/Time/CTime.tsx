import React, {FC, useEffect, useState} from 'react';
import {ITime} from "../../../types/types";

interface CTimeProps {
    time: number
}

const CTime: FC<CTimeProps> = ({time}) => {
    const [timeObj, setTimeObj] = useState<ITime>();

    useEffect(() => {
        setTimeObj({
            minutes: time % 60,
            hours: ~~(time / 60)
        });
    }, [time])

    return (
        <span>{`${!timeObj?.hours ? '' : timeObj.hours + 'ч'} ${timeObj?.minutes + 'мин'}`}</span>
    );
};

export default CTime;