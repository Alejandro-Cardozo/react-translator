import React, { useState, useEffect } from 'react';
import classes from './Translate.module.css';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

export default function Translate() {
  const [inputText, setInputText] = useState('');
  const [detectLanguageKey, setDetectedLanguageKey] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [selectedLanguageKey, setLanguageKey] = useState('');
  const [resultText, setResultText] = useState('');

  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })
      .then((response) => {
        setDetectedLanguageKey(response.data[0].language);
      })
      .catch((e) => console.log(e));
  };

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  const translateText = () => {
    getLanguageSource();

    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey,
    };
    axios
      .post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setResultText(response.data.translatedText);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`)
    .then((response) => {
     setLanguagesList(response.data)
    })

    getLanguageSource()
 }, [inputText])

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

              <select
                className={classes['language-select']}
                onChange={languageKey}
              >
                <option>Please Select Language..</option>
                {languagesList.map((language) => {
                  return (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  );
                })}
              </select>

              <Form.Field
                control={TextArea}
                placeholder='Your Result Translation..'
                value={resultText}
              />

              <Button color='orange' size='large' onClick={translateText}>
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
