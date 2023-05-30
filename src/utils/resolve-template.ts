/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */

const templates = [
  {
    name: 'confirm-email',
    id: 3059203
  },
  {
    name: 'forgot-password',
    id: 3059206
  },
  {
    name: 'recover-companies',
    id: 3059208
  },
  {
    name: 'reset-password',
    id: 3059209
  },
  {
    name: 'send-invite',
    id: 3059212
  },
  {
    name: 'welcome-mail',
    id: 3059213
  }
];
export async function getTemplate(
  template: string,
  data: any
): Promise<any> {
  const templateNode = templates.find((x)=>x.name===template);
  const content = {
    variables: data,
    TemplateID: templateNode?templateNode.id:3059213
  };
  return content;
}
