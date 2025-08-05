import 'dotenv/config'

// 테스트용 로그인 함수
async function testLogin(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ 로그인 성공!')
      console.log('사용자 정보:', data.user)
      console.log('메시지:', data.message)
    } else {
      console.log('❌ 로그인 실패!')
      console.log('오류:', data.error)
    }
    
    return { success: response.ok, data }
  } catch (error) {
    console.error('❌ 네트워크 오류:', error)
    return { success: false, error }
  }
}

// 메인 테스트 함수
async function main() {
  console.log('🔐 로그인 테스트 시작...\n')

  // 테스트 계정들
  const testAccounts = [
    { email: 'admin@example.com', password: 'admin123', name: '관리자' },
    { email: 'user1@example.com', password: 'password123', name: '김철수' },
    { email: 'user2@example.com', password: 'password123', name: '이영희' },
  ]

  for (const account of testAccounts) {
    console.log(`📧 ${account.name} 계정 테스트 (${account.email})`)
    console.log('─'.repeat(50))
    
    const result = await testLogin(account.email, account.password)
    
    if (result.success) {
      console.log(`✅ ${account.name} 로그인 성공!\n`)
    } else {
      console.log(`❌ ${account.name} 로그인 실패!\n`)
    }
    
    // 다음 테스트 전 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('🎯 로그인 테스트 완료!')
}

// 스크립트 실행
if (require.main === module) {
  main().catch(console.error)
}

export { testLogin } 