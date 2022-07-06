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
	const posts = useSelect ( (select) =>{
		return select('core').getEntityRecords('postType', 'sondaggi');
	} );
	var questionListIDs = posts && posts.map((element) =>element.title.raw+' ('+element.id+')');
	var selectedQuestionString= [];
	var choice;

	const [count, setCount] = useState("");
	if (attributes.idson){
		var answers;
		var selectedQuestion = posts && posts.find(element => element.id.toString()==attributes.idson.toString());
		if (selectedQuestion) {
			selectedQuestionString = [selectedQuestion.title.raw+' ('+selectedQuestion.id+')'];
			answers =selectedQuestion.meta.sondaggio[0];
			if(answers){
				var bigresponse = 0; 
				answers.forEach(answer => bigresponse = bigresponse + answer.count)
				var pers = [];
				answers.forEach(answer => pers.push(parseInt(answer.count / bigresponse * 100)))
			}
		}

	}
/*
	function handleOptionChange (changeEvent) {
		selectedOption= changeEvent.target.value
		setCount( changeEvent.target.value)	
	  }
	
	function handleFormSubmit (formSubmitEvent) {
		formSubmitEvent.preventDefault();

		console.log('You have selected:', count);
	}
*/
	
	function buildStats(){
		var div = document.getElementById("stats");
		var html = "";
		for (var i=0; i< pers.length; i++) {
			html+="	<dd className={`percentage percentage-`+"+pers[0]+"}><span id={`bar`+"+i+"} className=`text`>{"+answers[i].text+"}: { "+answers[i].count+"}</span></dd>"
		}
		div.appendChild(html);
	}

	window.addEventListener('DOMContentLoaded', (event) => {
		buildStats();
	});

	return (
		<div { ...useBlockProps() }>
			<p>
				{answers?selectedQuestion.title.raw:"Selecciona alguna pregunta"}
			</p>
			{answers && 
			<dl>
				<dt></dt>
				<div id="stats">
					{
						pers.map((per,i)=>
							{
								console.log(per+" "+i);
								return <dd className={`percentage percentage-`+per}><span id={"bar"+i} className="text">{answers[i].text}: { answers[i].count}</span></dd>
							}
						)
					}
				</div>
			</dl>
			
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
