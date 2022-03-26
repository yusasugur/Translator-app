import React from 'react';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import Button from '@mui/material/Button';

const Buttons = ({
    setIsListening,
    isListening,
    eng,
    tur,
    handleSave,
    handleReset,
    savedInput,
}) => {
    return (
        <div className='buttonContainer'>
            <div>
                <IconButton
                    onClick={() => setIsListening((prevState) => !prevState)}
                >
                    <div
                        className={isListening ? 'pulse' : 'pulse deactivated'}
                    >
                        <MicIcon />
                    </div>
                </IconButton>
            </div>
            <div>
                <Button
                    onClick={handleSave}
                    disabled={eng === '' || tur === ''}
                    variant='contained'
                >
                    Save My Output
                </Button>
            </div>
            <div>
                <Button
                    disabled={savedInput.length === 0}
                    onClick={handleReset}
                    variant='contained'
                >
                    Reset My History
                </Button>
            </div>
        </div>
    );
};

export default Buttons;
