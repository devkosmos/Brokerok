from http.server import BaseHTTPRequestHandler
from http.server import HTTPServer
import json
import requests
from datetime import datetime
import os

def handler(request):
    # Vercel передает request как словарь
    if request['method'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    if request['method'] == 'GET':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({
                'status': 'ok',
                'service': 'Brokerok Telegram Bot API',
                'endpoint': 'POST /api/send',
                'timestamp': datetime.now().isoformat()
            })
        }
    
    if request['method'] == 'POST':
        try:
            body = request.get('body', '{}')
            data = json.loads(body)
            
            if 'message' not in data:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    'body': json.dumps({
                        'ok': False,
                        'error': 'Поле "message" обязательно'
                    })
                }
            
            message = data['message'].strip()
            
            # Настройки из переменных окружения
            BOT_TOKEN = os.environ.get('BOT_TOKEN', '8412708945:AAEPdeJ9jd1N_Hlo-o7A0rOZjv3t-mq6gjA')
            CHAT_ID = os.environ.get('CHAT_ID', '8039700599')
            
            # Формируем сообщение
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            full_message = f"📋 НОВАЯ ЗАЯВКА BROKEROK\n\n"
            full_message += f"🕒 {timestamp}\n"
            full_message += f"━━━━━━━━━━━━━━━━━━━━\n\n"
            full_message += message
            full_message += f"\n\n━━━━━━━━━━━━━━━━━━━━\n"
            full_message += f"✅ Заявка #{int(datetime.now().timestamp())}"
            
            # Отправляем в Telegram
            url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            payload = {
                'chat_id': CHAT_ID,
                'text': full_message,
                'parse_mode': 'HTML',
                'disable_web_page_preview': True
            }
            
            response = requests.post(url, json=payload, timeout=10)
            result = response.json()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({
                    'ok': True,
                    'telegram_response': result,
                    'timestamp': timestamp
                })
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({
                    'ok': False,
                    'error': str(e)
                })
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({
            'ok': False,
            'error': 'Method not allowed'
        })
    }