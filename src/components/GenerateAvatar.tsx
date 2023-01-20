import React from "react";
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

const GenerateAvatar: React.FC = () => {
    let bmp = new MyBitmap(26, 26);


    let drawCircle = (x0: number, y0: number, r: number) => {
        for (let x = Math.floor(x0 - r); x < Math.ceil(x0 + r); x++) {
            for (let y = Math.floor(y0 - r); y < Math.ceil(y0 + r); y++) {
                if ((x - x0) * (x - x0) + (y - y0) * (y - y0) <= r * r) {
                    bmp.setPixel(x, y, [1, 0, 0, 1]);
                }
            }
        }
    }

    let createImg = () => {
        let random_r = Math.floor(Math.random() * 7 + 3);
        let random_y = Math.floor(Math.random() * 12 + 2);
        drawCircle(bmp.width / 2, random_y, random_r);
        for (let y = random_y; y < bmp.height; y++) {
            for (let x = 0; x < bmp.width; x++) {
                let random_x = bmp.width / 2;
                bmp.setPixel(random_x,  y, [1, 0, 0, 1]);

            }
        }




    }

    createImg()

    return (
        <div>
            <div>
                <input placeholder="Input..."/>
                <button>Generate</button>
            </div>
            <br/>
            <img src={`${bmp.asBase64()}`} style={{border: "2px solid black", imageRendering: 'pixelated'}}/>
        </div>
    )
}

export {GenerateAvatar};
