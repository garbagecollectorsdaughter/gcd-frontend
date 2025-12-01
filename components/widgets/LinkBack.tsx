import Image from 'next/image'
import button from '~/images/gotlovesick.gif'

export function LinkBack() {
  return (
    <div id="link-back">
      <div className="inner">
        <span>Link Back</span>
      </div>
      <div className="button-wrapper">
        <Image
          src={button.src}
          height={31}
          width={88}
          alt="88x31 button for GotLoveSick.com"
        />

        <textarea
          rows={5}
          defaultValue={`<a href="https://gotlovesick.com" target="_blank" title="GotLoveSick.com"><img src="https://raw.githubusercontent.com/meaganewaller/static/main/uploads/gotlovesick.gif" alt="GotLoveSick.com button" /></a>`}
        />

        <span>
          Use the code above to add this button to your website {'<3'}{' '}
        </span>
      </div>
    </div>
  )
}
