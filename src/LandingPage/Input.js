import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ eng, setEng, tur, isListening }) => {
    return (
        <div className='inputContainer'>
            <div>
                <TextField
                    id='outlined-multiline-static'
                    label='English'
                    placeholder='Please enter text or use mic to translate'
                    multiline
                    rows={5}
                    value={eng}
                    onChange={(e) => setEng(e.target.value)}
                    disabled={isListening}
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    id='outlined-multiline-static'
                    label='Turkish'
                    multiline
                    rows={5}
                    value={tur}
                    disabled
                    fullWidth
                />
            </div>
        </div>
    );
};

export default Input;
