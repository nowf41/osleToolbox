const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('接続確認を行います。')
        .addStringOption(option => option
            .setName('howto')
            .setDescription('pingを取得する方法を選択します。(デフォルト:メッセージ送信)')
            .setRequired(false)
            .setChoices(
                {name:'メッセージ送信', value:'msg'},
                {name:'API接続', value:'api'}
            )),
        async execute(interaction) {
            const howto = interaction.options.getString('howto') ?? 'msg';
            switch(howto){
                case 'api': {
                    await interaction.deferReply(); // 一時的な返信を行います
                    const message = await interaction.fetchReply();
                    const apiLatency = message.createdTimestamp - interaction.createdTimestamp;
                    interaction.editReply(`Ping(API接続): ${apiLatency}ms`);
                    break;
                }
                default: {
                    await interaction.deferReply();
                    const pingTimestamp = interaction.createdAt;
                    const reply = await interaction.fetchReply();
                    const latency = reply.createdAt - pingTimestamp;
                    interaction.editReply(`Ping(メッセージ送信): ${latency}ms`);
                    break;
                }
            }
          },
}