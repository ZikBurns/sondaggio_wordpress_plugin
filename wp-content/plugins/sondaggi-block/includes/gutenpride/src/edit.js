/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {useSelect} from  '@wordpress/data';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { get_post_meta } from '@wordpress/components';

import {
    useBlockProps,
    ColorPalette,
    InspectorControls,
} from '@wordpress/block-editor';
import {FormTokenField}  from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ setAttributes, attributes }) {
	const { idson, title, sondaggi_elenco } = attributes;
	const posts = useSelect ( (select) =>{
		return select('core').getEntityRecords('postType', 'sondaggi');
	} );
	var questionListIDs = posts && posts.map((element) =>element.title.raw+' ('+element.id+')');
	var selectedQuestionString= [];
	
	const [count, setCount] = useState("");
	if (attributes.idson){
		var answers;
		var selectedQuestion = posts && posts.find(element => element.id.toString()==attributes.idson.toString());
		if (selectedQuestion) {
			selectedQuestionString = [selectedQuestion.title.raw+' ('+selectedQuestion.id+')'];
			answers =selectedQuestion.meta.sondaggio[0];
			if(answers) var selectedOption= answers[0].text;
			else{
				answers=sondaggi_elenco;
				var selectedOption= answers[0].text;
			}			
		}
		/*if (attributes.sondaggi_elenco){
			answers = attributes.sondaggi_elenco
		}*/
	}

	function handleOptionChange (changeEvent) {
		selectedOption= changeEvent.target.value
		setCount( changeEvent.target.value)	
	  }
	
	function handleFormSubmit (formSubmitEvent) {
		formSubmitEvent.preventDefault();

		console.log('You have selected:', count);
	}
	return (
		<div { ...useBlockProps() }>
			<p>
				{selectedQuestion?selectedQuestion.title.raw:"Selecciona alguna pregunta"}
			</p>
			{selectedQuestion && <form onSubmit={handleFormSubmit}>
              <div className="radio">
                <label>
                  <input type="radio" 
				  value={answers[0].text}
				  checked={count === answers[0].text}
				  onChange={handleOptionChange} />
                  {answers[0].text}
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" 
				  value={answers[1].text} 
				  checked={count === answers[1].text} 
				  onChange={handleOptionChange}/>
                  {answers[1].text}
                </label>
              </div>
              <button className="btn btn-default" type="submit">Save</button>
            </form>
			}
			<InspectorControls key="setting">
                    <div id="gutenpride-controls">
                            <FormTokenField
								value = {selectedQuestionString}
								suggestions = { questionListIDs }
								maxLength = {1}
								onChange = {
									(value) => {
										if(value[0]){
											var idstr = value[0].slice(0,-1).toString();
											idstr = idstr.split(' (').pop().toString();
											setAttributes({idson: idstr});
											var selectedQuestion = posts && posts.find(element => element.id.toString()==idstr);
											if (selectedQuestion) {
												selectedQuestionString = [selectedQuestion.title.raw+' ('+selectedQuestion.id+')'];
												answers =selectedQuestion.meta.sondaggio[0];	
												setAttributes({title: selectedQuestion.title.raw});
												setAttributes({sondaggi_elenco: answers});	
											}
											else{
												selectedQuestionString= [];
												setAttributes({title: ""});
												setAttributes({sondaggi_elenco: []});
											}
										}
										else{
											selectedQuestionString= [];
											setAttributes({idson: ""});
											setAttributes({title: ""});
											setAttributes({sondaggi_elenco: []});
										}
									}
								} 
							/>
                    </div>
                </InspectorControls>
		</div>
		
	);
}
