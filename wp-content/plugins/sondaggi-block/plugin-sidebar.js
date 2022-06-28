( function ( wp ) {
    var registerPlugin = wp.plugins.registerPlugin;
    var PluginSidebar = wp.editPost.PluginSidebar;
    var el = wp.element.createElement;
    debugger;
    var TextControl = wp.components.TextControl;
    var FormTokenField = wp.components.FormTokenField;
    var useSelect = wp.data.useSelect;
    var useDispatch = wp.data.useDispatch;
    var questionList=[];
    questionList = wp.data.select('core').getEntityRecords('postType', 'sondaggi', -1);
    await 2;
    var selectedQuestion;

    var MetaBlockField = function ( props ) {
        var metaFieldValue = useSelect( function ( select ) {
            return select( 'core/editor' ).getEditedPostAttribute(
                'meta'
            )[ 'sidebar_plugin_meta_block_field' ];
        }, [] );
 
        var editPost = useDispatch( 'core/editor' ).editPost;
 
        return el( TextControl, {
            label: 'Question',
            value: metaFieldValue,
            onChange: function ( content ) {
                editPost( {
                    meta: { sidebar_plugin_meta_block_field: content },
                } );
            },
        } );
    };

    var SuggestionBrowser =  function (props){
        
        var questionListIDs = questionList.map((element) => element.id+element.title.raw);

        return el( FormTokenField, {
            value: selectedQuestion,
            suggestions: questionListIDs,
            maxLength: 1,
            onChange: function (content){
                selectedQuestion = content
            }
        });
    }
 
    registerPlugin( 'my-plugin-sidebar', {
        render: function () {
            return el(
                PluginSidebar,
                {
                    name: 'my-plugin-sidebar',
                    icon: 'admin-post',
                    title: 'Custom question and answers:',
                },
                el(
                    'div',
                    { className: 'plugin-sidebar-content' },
                    el( SuggestionBrowser )
                )
            );
        },
    } );
} )( window.wp );