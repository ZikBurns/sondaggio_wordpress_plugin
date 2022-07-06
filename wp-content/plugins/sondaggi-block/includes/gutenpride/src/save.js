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

	var bigresponse = 0; 
	sondaggi_elenco.forEach(answer => bigresponse = bigresponse + answer.count)
	var pers = [];
	sondaggi_elenco.forEach(answer => pers.push(parseInt(answer.count / bigresponse * 100)))


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
					<div>
						{
							sondaggi_elenco.map((son,i)=>
								{
									return <label>
										<input type="radio" 
										id = {son.text}
										value={son.text}
										name="choice"
										onChange={
										choice = son.text
										}
										/>
										{son.text+" "}
										{/*son.count*/}
									</label>;
								}
							)
						}
					</div>
					<button type='submit' >Save</button>
				</form>
				}
			</div>
			<div id='resultChart' style={styleresults}>
				<dl>
					<dt>
					</dt>
					<div>
						{
							pers.map((per,i)=>
								{
									console.log(per+" "+i);
									return <dd className={`percentage percentage-`+per}><span id={"bar"+i} className="text">{sondaggi_elenco[i].text}: { sondaggi_elenco[i].count}</span></dd>
								}
							)
						}
					</div>
				</dl>
			</div>
			
			<p id='idson' hidden>{idson}</p>
		</div>
	);
}
