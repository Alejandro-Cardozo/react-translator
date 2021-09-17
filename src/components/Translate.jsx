import React, { useState, useEffect } from 'react';
import classes from './Translate.module.css';
import { Form, TextArea, Button, Loader, Icon, Grid } from 'semantic-ui-react';
import axios from 'axios';
import SelectLanguage from './SelectLanguage';

export default function Translate() {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log(sourceLanguage);

  const sourceLanguageKeyHandler = (selectedLanguage) => {
    if (selectedLanguage.target.value) {
      setSourceLanguage(selectedLanguage.target.value);
    } else {
      setSourceLanguage('');
    }
  };

  const targetLanguageKeyHandler = (selectedLanguage) => {
    if (selectedLanguage.target.value) {
      setTargetLanguage(selectedLanguage.target.value);
    } else {
      setTargetLanguage('');
    }
  };

  const translateText = () => {
    setIsLoading(true);
    let data = {
      q: inputText,
      source: sourceLanguage,
      target: targetLanguage,
    };
    axios
      .post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setResultText(response.data.translatedText);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(`https://libretranslate.de/languages`)
      .then((response) => {
        setLanguagesList(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className={classes['app-header']}>
        <h2 className={classes['header']}>React Translator</h2>
        <Form>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <SelectLanguage
                  languagesList={languagesList}
                  languageKeyHandler={sourceLanguageKeyHandler}
                  placeholder={'Please select your language..'}
                />
                <Form.Field
                  control={TextArea}
                  placeholder='Type Text to Translate..'
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Grid.Column>
              <Grid.Column>
                <SelectLanguage
                  languagesList={languagesList}
                  languageKeyHandler={targetLanguageKeyHandler}
                  placeholder={'Please select your target language..'}
                />
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
            disabled={!sourceLanguage || !targetLanguage || isLoading}
            onClick={translateText}
          >
            {isLoading ? (
              <Loader active inline inverted size='tiny' />
            ) : (
              <Icon name='translate' />
            )}
            Translate
          </Button>
        </Form>
      </div>
    </>
  );
}
