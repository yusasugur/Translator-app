import React, { useState, useEffect } from 'react';
import Input from './Input';
import Buttons from './Buttons';
import ListRecords from './ListRecords';
import Box from '@mui/material/Box';
import '../styles/style.css';

const LandingPage = () => {
    const [eng, setEng] = useState('');
    const [tur, setTur] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [savedInput, setSavedInputs] = useState([]);

    let localInputs = localStorage.getItem('inputs');

    let SpeechRecognition;
    let mic;

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        mic = new SpeechRecognition();
        mic.continuous = true;
        mic.interimResults = true;
        mic.lang = 'en-US';
    } else {
        console.log('Microphone could not set');
    }

    useEffect(() => {
        handleListen();
    }, [isListening]);

    useEffect(() => {
        localInputs = JSON.parse(localInputs);
        if (localInputs && localInputs.length > 0) {
            setSavedInputs(localInputs);
        }
    }, []);

    useEffect(() => {
        if (eng !== '') {
            let time = 0;
            if (!isListening) {
                time = 1000;
            }
            const delayDebounceFn = setTimeout(() => {
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify({
                        q: eng,
                        source: 'en',
                        target: 'tr',
                    }),
                    headers: { 'Content-Type': 'application/json' },
                };

                fetch(
                    'https://translate.argosopentech.com/translate',
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => setTur(data.translatedText));
            }, time);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setTur('');
        }
    }, [eng]);

    const handleListen = () => {
        if (isListening) {
            setEng('');
            setTur('');
            mic.start();
            mic.onend = () => {
                mic.start();
            };
        } else {
            mic.stop();
        }

        mic.onresult = async (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('');

            setEng(transcript);

            mic.onerror = (event) => {
                console.log(event.error);
            };
        };
    };

    const handleSave = () => {
        if (eng !== '' && tur !== '') {
            if (localInputs) {
                localInputs = JSON.parse(localInputs);
                localInputs = [{ textTur: tur, textEng: eng }, ...localInputs];
            } else {
                localInputs = [{ textTur: tur, textEng: eng }];
            }
            localStorage.setItem('inputs', JSON.stringify(localInputs));
            setSavedInputs(localInputs);
        }
    };

    const handleReset = () => {
        localInputs = [];
        localStorage.setItem('inputs', JSON.stringify(localInputs));
        setSavedInputs(localInputs);
    };

    return (
        <div className='container'>
            {' '}
            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete='off'
                className='box'
            >
                <Input
                    eng={eng}
                    setEng={setEng}
                    tur={tur}
                    isListening={isListening}
                />
                <Buttons
                    setIsListening={setIsListening}
                    isListening={isListening}
                    eng={eng}
                    tur={tur}
                    handleSave={handleSave}
                    handleReset={handleReset}
                    savedInput={savedInput}
                />
            </Box>
            <ListRecords savedInput={savedInput} />
        </div>
    );
};

export default LandingPage;
