import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixProductData() {
  try {
    console.log('상품 데이터 수정을 시작합니다...')
    
    // 모든 상품 조회
    const products = await prisma.product.findMany()
    console.log(`총 ${products.length}개의 상품을 찾았습니다.`)
    
    for (const product of products) {
      console.log(`상품 "${product.name}" 처리 중...`)
      
      const updates: any = {}
      
      // images 필드 수정
      if (product.images && typeof product.images === 'string') {
        try {
          JSON.parse(product.images)
          console.log('  - images: 이미 올바른 JSON 형식입니다.')
        } catch {
          // JSON 파싱 실패 시 배열로 변환
          const fixedImages = [product.images]
          updates.images = JSON.stringify(fixedImages)
          console.log(`  - images: "${product.images}" -> ${JSON.stringify(fixedImages)}`)
        }
      }
      
      // sizes 필드 수정
      if (product.sizes && typeof product.sizes === 'string') {
        try {
          JSON.parse(product.sizes)
          console.log('  - sizes: 이미 올바른 JSON 형식입니다.')
        } catch {
          // JSON 파싱 실패 시 배열로 변환
          const fixedSizes = [product.sizes]
          updates.sizes = JSON.stringify(fixedSizes)
          console.log(`  - sizes: "${product.sizes}" -> ${JSON.stringify(fixedSizes)}`)
        }
      }
      
      // colors 필드 수정
      if (product.colors && typeof product.colors === 'string') {
        try {
          JSON.parse(product.colors)
          console.log('  - colors: 이미 올바른 JSON 형식입니다.')
        } catch {
          // JSON 파싱 실패 시 배열로 변환
          const fixedColors = [product.colors]
          updates.colors = JSON.stringify(fixedColors)
          console.log(`  - colors: "${product.colors}" -> ${JSON.stringify(fixedColors)}`)
        }
      }
      
      // details 필드 수정
      if (product.details && typeof product.details === 'string') {
        try {
          JSON.parse(product.details)
          console.log('  - details: 이미 올바른 JSON 형식입니다.')
        } catch {
          // JSON 파싱 실패 시 배열로 변환
          const fixedDetails = [product.details]
          updates.details = JSON.stringify(fixedDetails)
          console.log(`  - details: "${product.details}" -> ${JSON.stringify(fixedDetails)}`)
        }
      }
      
      // 업데이트가 필요한 경우에만 실행
      if (Object.keys(updates).length > 0) {
        await prisma.product.update({
          where: { id: product.id },
          data: updates
        })
        console.log(`  - 상품 "${product.name}" 업데이트 완료`)
      } else {
        console.log(`  - 상품 "${product.name}" 수정 불필요`)
      }
    }
    
    console.log('모든 상품 데이터 수정이 완료되었습니다.')
  } catch (error) {
    console.error('상품 데이터 수정 중 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 스크립트 실행
fixProductData() 