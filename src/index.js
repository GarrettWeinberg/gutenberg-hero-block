import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  MediaUpload,
  MediaPlaceholder,
  InnerBlocks,
  BlockControls,
  InspectorControls,
  ColorPalette
} from '@wordpress/block-editor';
import {
  Toolbar,
  IconButton,
  FocalPointPicker,
  PanelBody,
  PanelRow,
  SelectControl,
  Button,
} from '@wordpress/components';

registerBlockType( 'create-block/hero-block', {
	title: __( 'Hero Block', 'create-block' ),
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'create-block'
	),
	category: 'widgets',
	icon: 'smiley',
	supports: {
		html: false,
		align: true,
	},
	attributes: {
    image: {
      type: 'object'
    },
    repeat: {
      type: 'string',
      default: 'no-repeat'
    },
    size: {
      type: 'string',
      default: 'auto'
		},
	},

	edit( { className, attributes, setAttributes } ) {
    const { image, focalPoint, repeat, size, backgroundColor } = attributes;

    const handleImage = image => {
      setAttributes({ image });
    };

    const style = {
      backgroundRepeat: repeat,
      backgroundSize: size,
      backgroundColor: backgroundColor,
      backgroundPosition: (typeof focalPoint != "undefined" ) ?  `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : ``,
      backgroundImage: (typeof image != "undefined" ) ? `url(${image.url})` : ``
    };
		
		return (
			<div className={ className } style={ style }>
      <BlockControls>
        <Toolbar>
          <MediaUpload
            onSelect={handleImage}
            allowedTypes={['image']}
            render={({ open }) => (
              <IconButton
                className="components-toolbar__control"
                label={__('Edit media')}
                icon="edit"
                onClick={open}
              />
            )}
          />
        </Toolbar>
      </BlockControls>
      { !! image && (
      <InspectorControls>
					<PanelBody title={ __( 'Media settings' ) } initialOpen={true}>
					<SelectControl
              label="Repeat"
              help="If and how this background should repeat."
              value={repeat}
              options={[
                { label: "Repeat", value: "repeat" },
                { label: "Repeat Horizontally", value: "repeat-x" },
                { label: "Repeat Vertically", value: "repeat-y" },
                { label: "No Repeat", value: "no-repeat" },
                { label: "Space", value: "space" },
                { label: "Round", value: "round" },
              ]}
              onChange={value => {
                setAttributes({ repeat: value });
              }}
            />
            <SelectControl
              label="Size"
              help="Background size."
              value={size}
              options={[
                { label: "Auto", value: "auto" },
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
              ]}
              onChange={value => {
                setAttributes({ size: value });
              }}
            />
          </PanelBody>
					</InspectorControls>
				)}
      {image && image.url ? (
            <div />
          ) : (
            <MediaPlaceholder onSelect={handleImage} />
          )}
        <InnerBlocks />
      </div>
    );
  },

	
	save({ attributes }) {
    const styleSave = {
      backgroundRepeat: attributes.repeat,
      backgroundSize: attributes.size,
      backgroundImage: `url(${attributes.image.url})`,
    };

    return (
      <div style={ styleSave }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );