import React, {useState} from "react";
import {MyBitmap} from "./MyBitmap";

const mulberry32 = (a: number): () => number => {
    return () => {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const stringToHash = (str: string): number => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const randomColor = (rng: ()=>number): [number, number, number, number] => {
    let r = rng();
    let g = rng();
    let b = rng();
    return [r, g, b, 1];
}

const GenerateAvatar: React.FC = () => {
    let [str, setStr] = useState('');

    let bmp = new MyBitmap(10, 10);
    let rng = mulberry32(stringToHash(str));

    // let drawCircle = (x0: number, y0: number, r: number) => {
    //     for (let x = Math.floor(x0 - r); x < Math.ceil(x0 + r); x++) {
    //         for (let y = Math.floor(y0 - r); y < Math.ceil(y0 + r); y++) {
    //             if ((x - x0) * (x - x0) + (y - y0) * (y - y0) <= r * r) {
    //                 bmp.setPixel(x, y, [1, 0, 0, 1]);
    //             }
    //         }
    //     }
    // }

    const drawLine = (x: number, y: number, color: [number, number, number, number]) => {
        for (let i = 0; i < 10; i++) {
            let random_number_x = Math.floor(rng() * 3 - 1);
            let random_number_y = Math.floor(rng() * 3 - 1);
            bmp.setPixel(x + random_number_x, y + random_number_y, color);

        }
    }

    const moreLine = () => {
        let array_color: [number, number, number, number] = randomColor(rng);
        for (let i = 0; i < 5; i++) {
            let random_x = Math.floor(rng() * bmp.width);
            let random_y = Math.floor(rng() * bmp.height);

            drawLine(random_x, random_y, array_color);
        }
    }

    let createImg = () => {
        moreLine();
        for (let y = 0; y < bmp.height; y++) {
            for (let x = 0; x < bmp.width / 2; x++) {
                let color_array = bmp.getPixel(x, y);
                let new_x = (bmp.width / 2 - x) + bmp.width / 2 - 1;
                bmp.setPixel(new_x, y, color_array);
            }
        }

    }
    createImg();


    return (
        <div>
            <div>
                <input placeholder="Input..." onChange={(e)=>{
                    setStr(e.target.value)
                }}/>
            </div>
            <br/>
            <img src={`${bmp.asBase64()}`} style={{border: '1px solid pink', imageRendering: 'pixelated'}}/>
        </div>
    )
}

export {GenerateAvatar};
