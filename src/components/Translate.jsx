import React, { useState, useEffect } from 'react';
import classes from './Translate.module.css';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

export default function Translate() {
  const [inputText, setInputText] = useState('');
  const [detectLanguageKey, setDetectedLanguageKey] = useState('')

  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })
      .then((response) => {
        setDetectedLanguageKey(response.data[0].language)
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className={classes['app-header']}>
        <h2 className={classes['header']}>React Translator</h2>

        <div className={classes['app-body']}>
          <div>
            <Form>
              <Form.Field
                control={TextArea}
                placeholder='Type Text to Translate..'
                onChange={(e) => setInputText(e.target.value)}
              />

              <select className={classes['language-select']}>
                <option>Please Select Language..</option>
              </select>

              <Form.Field
                control={TextArea}
                placeholder='Your Result Translation..'
              />

              <Button color='orange' size='large' onClick={getLanguageSource}>
                <Icon name='translate' />
                Translate
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
