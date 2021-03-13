import { CaretUpOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import './link-marker.scss';

export type LinkMarker = {
	arrow: string[],
};
export const LinkMarker = ({
    arrow = [],
}: LinkMarker) => {
    return <div className="link-marker-container">
        {arrow.map(entry => <img key={entry} className={`link-marker-arrow arrow-${entry}`} alt="link marker"
            src={`/asset/image/link/link-arrow-${entry}.png`} />)}
        <img key={'overlay'} className="link-overlay" alt="link overlay" src={'/asset/image/link/link-overlay.png'} />
    </div>;
};

export type LinkMarkChooser = {
    defaultValue?: string[],
    onChange?: (value: string[]) => void,
};
export const LinkMarkChooser = ({
    defaultValue = [],
    onChange = () => {},
}: LinkMarkChooser) => {
    const [choosenArrow, setChoosenArrow] = useState(defaultValue);
    const rotateMap = [-45, 0, 45, -90, 0, 90, -135, 180, 135];

    const literalChoosenArrow = JSON.stringify(choosenArrow);
    useEffect(() => {
        onChange(choosenArrow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [literalChoosenArrow]);

    return <div className="link-marker-chooser">
        <div className="title">
            Link Arrows
        </div>
        {[...Array(9)].map((entry, index) => {
            const normalizedIndex = `${index + 1}`;

            if (normalizedIndex === '5') return <Tooltip key="5" overlay="Reset">
                <div className="link-marker-reset" onClick={() => {
                    setChoosenArrow([]);
                }}>R</div>
            </Tooltip>;

            return <div key={normalizedIndex}
                className={`link-marker-button marker-${index} ${choosenArrow.includes(normalizedIndex) ? 'marker-checked' : ''}`}
                onClick={() => {
                    setChoosenArrow(cur => {
                        let newMap = [...cur];

                        if (newMap.includes(normalizedIndex)) newMap = newMap.filter(entry => entry !== normalizedIndex);
                        else newMap.push(normalizedIndex);

                        return newMap;
                    });
                }}
            >
                <div className="link-marker-icon" style={{ transform: `rotate(${rotateMap[index]}deg)` }}>
                    <CaretUpOutlined />
                </div>
            </div>;
        })}
    </div>;
};