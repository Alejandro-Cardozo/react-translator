import React, { useState, useEffect } from 'react';
import classes from './Translate.module.css';
import { Form, TextArea, Button, Icon, Grid } from 'semantic-ui-react';
import axios from 'axios';

export default function Translate() {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [resultText, setResultText] = useState('');

  const sourceLanguageKeyHandler = (selectedLanguage) => {
    setSourceLanguage(selectedLanguage.target.value);
  };

  const targetLanguageKeyHandler = (selectedLanguage) => {
    setTargetLanguage(selectedLanguage.target.value);
  };

  const translateText = () => {
    let data = {
      q: inputText,
      source: sourceLanguage,
      target: targetLanguage,
    };
    axios
      .post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setResultText(response.data.translatedText);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguagesList(response.data);
    }).catch(e => console.log(e));
  }, []);

  return (
    <>
      <div className={classes['app-header']}>
        <h2 className={classes['header']}>React Translator</h2>
        <Form>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <select
                  className={classes['language-select']}
                  onChange={sourceLanguageKeyHandler}
                >
                  <option>Please select your language..</option>
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
                  placeholder='Type Text to Translate..'
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Grid.Column>
              <Grid.Column>
                <select
                  className={classes['language-select']}
                  onChange={targetLanguageKeyHandler}
                >
                  <option>Please select your target language..</option>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Button
            style={{ margin: '15px' }}
            color='orange'
            size='large'
            disabled={!sourceLanguage || !targetLanguage}
            onClick={translateText}
          >
            <Icon name='translate' />
            Translate
          </Button>
        </Form>
      </div>
    </>
  );
}
