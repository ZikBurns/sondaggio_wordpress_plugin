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
	
	var bigresponse = sondaggi_elenco[0].count + sondaggi_elenco[1].count;
	var per0 = parseInt(sondaggi_elenco[0].count / bigresponse * 100);
	var per1 = parseInt(sondaggi_elenco[1].count / bigresponse * 100);
	var stylesondaggio;
	var styleresults;
	//if(document.cookie.includes("sondaggioSent")){
		stylesondaggio="display: block;"
		styleresults="display: none;"
	//} 
	/*else{
		stylesondaggio="display: block;"
		styleresults="display: none;"
	}*/

	return (
		<div { ...useBlockProps.save() }>
			<div id='frontSondaggio' style={stylesondaggio}>
				<p>{idson ? title : "Choose a sondaggio"}</p>
				{idson && <form id="sendForm">
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
						<button type='submit' >Save</button>
					</form>
				}
			</div>
			<div id='resultChart' style={styleresults}>
				<dl>
					<dt>
					</dt>
					<dd class={`percentage percentage-`+per0}><span id={"bar"+0} class="text">{sondaggi_elenco[0].text}: { sondaggi_elenco[0].count}</span></dd>
					<dd class={`percentage percentage-`+per1}><span id={"bar"+1} class="text">{sondaggi_elenco[1].text}: { sondaggi_elenco[1].count}</span></dd>
				</dl>
			</div>
			
			<p id='idson' hidden>{idson}</p>
		</div>
	);
}
