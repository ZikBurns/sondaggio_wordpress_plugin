/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { idson, title, sondaggi_elenco } = attributes;
	debugger;

	var choice;
	var showStats = true;
	function handleFormSubmit (event) {
		event.preventDefault();
		const reactAppData = window.wpRoomDesigner || {}
		const { ajax_url} = reactAppData
		if(choice == sondaggi_elenco[0].text){
			sondaggi_elenco[0].count++;
		} 
		else sondaggi_elenco[1].count++;
		
		var parameters_to_send = {id:idson, elenco: sondaggi_elenco,risposta:choice};
		console.log('You have selected:', choice );
		fetch(`http://localhost/wordpress/wp-admin/admin-ajax.php`, {
			method: 'POST',
			body: JSON.stringify(parameters_to_send),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.error("Error:", err));
		showStats=false;
	}
	var bigresponse = sondaggi_elenco[0].count + sondaggi_elenco[1].count;
	var per0 = parseInt(sondaggi_elenco[0].count / bigresponse * 100);
	var per1 = parseInt(sondaggi_elenco[1].count / bigresponse * 100);
	return (
		<div { ...useBlockProps.save() }>
			<p>{idson ? title: "Choose a sondaggio"}</p>
			{idson && <div>
					<label>
						<input type="radio" 
						id = {sondaggi_elenco[0].text}
						value={sondaggi_elenco[0].text}
						name="choice"
						onChange={
						choice = sondaggi_elenco[0].text
						}
						/>
						{sondaggi_elenco[0].text+" "}
						{sondaggi_elenco[0].count}
					</label>
					<label>
						<input type="radio" 
						id = {sondaggi_elenco[1].text}
						value={sondaggi_elenco[1].text} 
						name="choice"
						onChange={
						choice = sondaggi_elenco[1].text
						}
						/>
						{sondaggi_elenco[1].text+" "}
						{sondaggi_elenco[1].count}
					</label>
					<button class="more-link" onClick={e=>handleFormSubmit(e)}>Save</button>
				</div>
			}
			<dl>
				<dt>
				</dt>
				<dd class={`percentage percentage-`+per0}><span class="text">{sondaggi_elenco[0].text}: { sondaggi_elenco[0].count}</span></dd>
				<dd class={`percentage percentage-`+per1}><span class="text">{sondaggi_elenco[1].text}: { sondaggi_elenco[1].count}</span></dd>
			</dl>
		</div>
	);
	
	

}
