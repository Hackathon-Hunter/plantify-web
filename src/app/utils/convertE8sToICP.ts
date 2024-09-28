export function convertE8sToICP(e8s: string): string {
  const e8sInOneICP = BigInt(100_000_000); 
  const icp = Number(e8s) / Number(e8sInOneICP);
  return icp.toFixed(5); 
}
