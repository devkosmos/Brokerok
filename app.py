"""
Файл app.py для Vercel
"""
from api.index import app

# Экспортируем app для Vercel
if __name__ == '__main__':
    app.run(debug=True)