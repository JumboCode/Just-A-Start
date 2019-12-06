from twilio.rest import Client


# Your Account SID from twilio.com/console
account_sid = "AC171349952d22bd1b91d1637d4586abbe"
# Your Auth Token from twilio.com/console
auth_token  = ""

client = Client(account_sid, auth_token)

#list of subscribers/people
Users= ["user1", "user2"]

#get's input from user
content = input("Enter the message you want to send: ")

# loop to iterate through list of people
for user in Users:
    message = client.messages.create(
        from_="+12034429209", 
        body= content,
        to = user)

    print(message.sid)