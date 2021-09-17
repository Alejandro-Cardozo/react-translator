import React from 'react';
import classes from './Translate.module.css';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';

export default function Translate() {
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
              />

              <select className={classes['language-select']}>
                <option>Please Select Language..</option>
              </select>

              <Form.Field
                control={TextArea}
                placeholder='Your Result Translation..'
              />

              <Button color='orange' size='large'>
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
