const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('rmmsg')
        .setDescription('stringと一致するメッセージを削除します。')
        .addStringOption(option => option
            .setName('string')
            .setDescription('対象メッセージの内容')
            .setRequired(true)
        ),
        async execute(interaction) {
            const str = interaction.options.getString('string');
            const guild = interaction.guild;
            const client = interaction.client;
            const channel = interaction.channel;
            channel.messages.fetch()
            .then(messages => {
              messages.forEach(message => {
                if(message.content == str){
                message.delete()
                  .then(deletedMessage => {
                    console.log(`メッセージが削除されました: ${deletedMessage.content}`);
                  })
                  .catch(error => {
                    console.error('メッセージの削除中にエラーが発生しました', error);
                  });
                }
              });
            })
            .catch(error => {
              console.error('メッセージの取得中にエラーが発生しました', error);
            });
            await interaction.reply({content: 'success!', ephemeral: true})
          },
}