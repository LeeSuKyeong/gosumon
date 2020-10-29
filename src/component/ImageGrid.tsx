import React, {useEffect} from "react";
import './ImageGrid.scss';

const ImageGrid = () => {
    const audio = new Audio(require('./sound/bgm.mp3').default);
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    const $ = (query: any) => {
        if (query[0] == '#') {
            return document.querySelector(query)
        } else {
            const dom = document.querySelectorAll(query);
            if(dom.length > 1){
                return dom;
            }else{
                return dom[0];
            }
        }
    };

    const randomIndex = (count: number) => {
        return Math.floor(Math.random() * count);
    };

    useEffect(() => {
        const imagesUrl: any = [];
        const imageGrid = $('.imageGridWrap > p');

        for (let i = 1; i <= 120; i++) {
            let url: any = '';
            if (i < 10) {
                url = '00' + i;
            } else if (i >= 10 && i < 100) {
                url = '0' + i;
            } else {
                url = i;
            }
            imagesUrl.push(`url( ${require('./image/' + url + '.jpg').default} )`);
        }

        imageGrid.forEach((item: any, i: number) => {
            item.onclick = () => {
                $('#bigImageWrap').style.display = 'flex';
                $('#bigImage').style.backgroundImage = item.style.backgroundImage;
            }
        });

        setTimeout(() => {
            $('.imageGridTitle').style.opacity = 0;
        }, 8500);

        setTimeout(() => {
            $('.imageGridTitle').style.display = 'none';
            $('.imageGridWrap').style.display = 'flex';
        }, 9500);

        setInterval(() => {
            imageGrid.forEach((item: any, i: number) => {
                setTimeout(() => {
                    item.style.opacity = 1;
                    item.style.backgroundImage = imagesUrl[randomIndex(imagesUrl.length)];
                }, 100 * (i % 10) + (i * 10));
                setTimeout(() => {
                    item.style.opacity = 0;
                }, 100 * (i % 10) + (i * 10) + 10000)
            });
        }, 12000);
    });

    return (
        <div className={'imageGrid'}>
            <h1 className={'imageGridTitle'}>GOSUMON<br/>IMAGE GRID</h1>
            <div className={'imageGridWrap'}>
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
            </div>
            <div id="bigImageWrap" onClick={() => {
                $('#bigImageWrap').style.display = 'none';
            }}>
                <p id="bigImage" />
            </div>
            <label htmlFor="playPauseCheckbox" className="playPause">
                <input type="checkbox" value="" id="playPauseCheckbox" name="playPauseCheckbox" onClick={() => {
                    if ($('#playPauseCheckbox').checked) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                }}/>
                <label htmlFor="playPauseCheckbox" className='playPauseLabel'></label>
            </label>
        </div>
    )
};

export default ImageGrid;