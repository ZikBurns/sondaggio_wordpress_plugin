
( function ( wp ) {
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    var TextControl = wp.components.TextControl;
    var useSelect = wp.data.useSelect;
    var useEntityProp = wp.coreData.useEntityProp;
    var useBlockProps = wp.blockEditor.useBlockProps;
 
    registerBlockType( 'gutenberg-block/sondaggi', {
        title:'Question',
        icon:'smiley',
        category:'text',
 
        edit: function ( props ) {
            var blockProps = useBlockProps();
            var postType = useSelect( function ( select ) {
                return select('core/editor').getCurrentPostType();
            }, [] );
            var entityProp = useEntityProp('postType',postType,'meta');
            var meta = entityProp[0];
            var setMeta = entityProp[1];
            var metaFieldValue = meta['sondaggio'];
            function updateMetaValue(newValue) 
            {
                setMeta
                (
                    Object.assign
                    ( {}, meta, {
                        softhunt_meta_block_field: newValue,
                    } )
                );
            }
 
            return el(
                'div',
                blockProps,
                el( TextControl, {
                    label: 'Question',
                    value: metaFieldValue,
                    onChange: updateMetaValue,
                } )
            );
        },
 
        // No information saved to the block
        // Data is saved to post meta via attributes
        save: function (props) {
            return null;
        },
    } );
} )( window.wp );