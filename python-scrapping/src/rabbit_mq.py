import pika

def connect():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='stats')
    return channel

def send_to_queue(channel, message):
    channel.basic_publish(exchange='', routing_key='stats', body=message)
    print(" [x] Sent %r" % message)