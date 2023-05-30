/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */


export const verify_email = (data: any) => `
<tr>
    <td style="padding-bottom: 30px">
    <span>
        <span>Hi,</span> <br /> ${data.name}
    <br />
    </span>
    </td>
</tr>
<tr>
    <td style="padding-bottom: 40px">
    <span>
        click the link to verify your email <b> <a href="${process.env.API_URL}/verify?email=${data.email}"> Verify </a> . <br />
    </span>
    </td>
</tr>
<tr>
    <td>
      <span style="line-height: 40px">Thanks</span> <br />
      <span style="line-height: 40px">Yours Credibly</span> <br />
      <span style="font-weight: 600; display: block;">The ToNote Team</span>
      <span style="display: block;">Email: ask@gettonote.com</span>
      <span style="display: block;">Call: +234 814 650 7035</span>
    </td>
</tr>`;
